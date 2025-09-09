"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Camera,
  X,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageViewerProps {
  images: Array<{
    FileId: string;
    FileName?: string;
  }>;
  className?: string;
}

export function ImageViewer({ images, className }: ImageViewerProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog>
      <DialogTrigger className={cn("cursor-pointer", className)}>
        <div className="group relative flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 hover:shadow-sm">
          <Camera className="size-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            {images.length}
          </span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
        </div>
      </DialogTrigger>
      <DialogContent
        className="w-[95vw] border-slate-700 bg-slate-900/95 p-0 backdrop-blur-md"
        showCloseButton={false}
      >
        {/* Custom close button */}
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>

        {/* Minimal header overlay with hidden title for accessibility */}
        <div className="absolute top-0 left-0 z-40 p-4">
          <div className="flex items-center gap-2 rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
            <ImageIcon className="h-4 w-4 text-white/90" />
            <DialogTitle asChild>
              <span className="text-sm font-medium text-white/90">
                Foto {current || 1} van {images.length}
              </span>
            </DialogTitle>
          </div>
        </div>

        {/* Carousel container */}
        <Carousel
          setApi={setApi}
          opts={{
            loop: false,
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image.FileId}>
                <div className="relative h-[95vh] w-full">
                  <Image
                    src={`/aboma-sbx/webreports/api/get-image?url=${image.FileId}`}
                    alt={image.FileName || `foto ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                    loading="eager"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons - only show if more than one image */}
          {images.length > 1 && (
            <>
              {api?.canScrollPrev() && (
                <CarouselPrevious className="absolute top-1/2 left-4 h-10 w-10 -translate-y-1/2 rounded-full border-white/20 bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70">
                  <ChevronLeft className="h-6 w-6" />
                </CarouselPrevious>
              )}
              {api?.canScrollNext() && (
                <CarouselNext className="absolute top-1/2 right-4 h-10 w-10 -translate-y-1/2 rounded-full border-white/20 bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70">
                  <ChevronRight className="h-6 w-6" />
                </CarouselNext>
              )}
            </>
          )}
        </Carousel>

        {/* Optional: Dots indicator at bottom for multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === current - 1 || (!current && index === 0)
                    ? "w-8 bg-white"
                    : "bg-white/50 hover:bg-white/70",
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
