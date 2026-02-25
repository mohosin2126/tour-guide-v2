/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "react-rating-stars-component" {
  import { ComponentType } from "react";
  interface ReactStarsProps {
    count?: number;
    value?: number;
    onChange?: (newRating: number) => void;
    size?: number;
    isHalf?: boolean;
    activeColor?: string;
    color?: string;
    edit?: boolean;
    emptyIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
  }
  const ReactStars: ComponentType<ReactStarsProps>;
  export default ReactStars;
}

declare module "swiper/react" {
  export const Swiper: React.ComponentType<Record<string, unknown>>;
  export const SwiperSlide: React.ComponentType<Record<string, unknown>>;
}

declare module "swiper/modules" {
  export const Navigation: unknown;
  export const Pagination: unknown;
  export const Autoplay: unknown;
  export const EffectFade: unknown;
  export const EffectCoverflow: unknown;
  export const Thumbs: unknown;
}
