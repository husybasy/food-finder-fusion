
import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Camera } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';

interface BarcodeScannerProps {
  onCodeScanned: (code: string) => void;
}

export const BarcodeScanner = ({ onCodeScanned }: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const startScanning = async () => {
    try {
      setIsScanning(true);
      const codeReader = new BrowserMultiFormatReader();
      
      if (videoRef.current) {
        const constraints = {
          video: { facingMode: 'environment' }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        
        codeReader.decodeFromVideoElement(videoRef.current, (result, error) => {
          if (result) {
            onCodeScanned(result.getText());
            stopScanning();
            toast({
              title: "Code scanné avec succès",
              description: `Code: ${result.getText()}`,
            });
          }
          if (error) {
            console.error("Erreur de scan:", error);
          }
        });
      }
    } catch (error) {
      console.error("Erreur d'accès à la caméra:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'accéder à la caméra",
      });
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        <Button
          onClick={isScanning ? stopScanning : startScanning}
          className="flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          {isScanning ? "Arrêter le scan" : "Scanner un code"}
        </Button>
      </div>
      
      {isScanning && (
        <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
          <div className="absolute inset-0 border-2 border-primary opacity-50" />
        </div>
      )}
    </div>
  );
};
