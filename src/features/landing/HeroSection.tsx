import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { ConsoleShowcase } from './ConsoleShowcase';
import { Button } from '../../components/ui/Button';
import { DisplayText } from '../../components/ui/Typography';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-10 pt-6 pb-8 flex flex-col justify-between z-10">
      <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-6 my-auto">
        
        <div className="lg:col-span-5 flex flex-col justify-between z-30 space-y-6 lg:space-y-10">
          <div className="mt-4 lg:mt-10">
            <div className="flex items-baseline gap-6 sm:gap-10">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#F85E10] tracking-widest whitespace-nowrap">
                {siteConfig.yearTag}
              </span>
              <h1 className="font-headline font-medium text-3xl sm:text-5xl xl:text-[54px] text-[#181615] tracking-tight leading-[1.08] uppercase">
                {siteConfig.headline.line1}
              </h1>
            </div>
            <div className="font-headline font-medium text-3xl sm:text-5xl xl:text-[54px] text-[#181615] tracking-tight leading-[1.08] uppercase mt-1">
              <div>{siteConfig.headline.line2}</div>
              <div className="pl-6 sm:pl-12">{siteConfig.headline.line3}</div>
            </div>
          </div>

          <div className="relative z-30 pt-2 sm:pt-4 pointer-events-none">
            <DisplayText align="left" className="drop-shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              PLAY
            </DisplayText>
          </div>

          <div className="relative z-40 flex flex-wrap items-center gap-4 sm:gap-5 pt-1">
            <Button variant="primary">{siteConfig.ctas.primary}</Button>
            <Button variant="secondary">{siteConfig.ctas.secondary}</Button>
          </div>
        </div>

        <div className="lg:col-span-4 flex items-center justify-center z-20 -my-4 lg:my-0 lg:-ml-8">
          <ConsoleShowcase />
        </div>

        <div className="lg:col-span-3 flex flex-col justify-end items-start lg:items-end self-end z-10 space-y-6 mt-6 lg:mt-0">
          <p className="max-w-[290px] text-xs sm:text-sm text-[#4A4643] font-sans font-medium leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="w-full flex justify-end overflow-visible pointer-events-none">
            <DisplayText align="right" className="translate-x-2 sm:translate-x-6">
              MORE
            </DisplayText>
          </div>
        </div>

      </div>
    </section>
  );
};
