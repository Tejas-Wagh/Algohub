import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <main className="overflow-x-hidden">
        <section>
          <div className="py-24 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex flex-row max-w-6xl px-12 ">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-4xl font-medium md:text-6xl lg:mt-10 sm:text-left">
                  Level Up
                  <br />
                  Your Coding Game
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg sm:text-left">
                  Solve curated challenges or practice your own code in the
                  built-in IDE-everything you need to get interview-ready.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start sm:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="px-5 text-base bg-[#F4F4F4] hover:bg-gray-200/1.5 dark:bg-gray-50 dark:hover:bg-gray-300 text-black"
                  >
                    <Link href="/problems">
                      <span className="text-nowrap">Let&apos;s Get Coding</span>{" "}
                      <div className="flex items-center justify-center">
                        <ChevronRightIcon
                          className="text-[#35C153] dark:text-black mt-1"
                          size={16}
                        />
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src={"/hero-image.png"}
                  alt="hero-image"
                  width={380}
                  height={300}
                  className="hidden sm:flex mr-10"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Coding Languages Supported</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert"
                      src="/python.png"
                      alt="Python logo"
                      height="20"
                      width={"20"}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert"
                      src="/java.png"
                      alt="java logo"
                      height="20"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert"
                      src="/js.png"
                      alt="js Logo"
                      height="20"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert"
                      src="/c-.png"
                      alt="cpp Logo"
                      height="20"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert "
                      src="/go-lang.png"
                      alt="go-lang Logo"
                      height="10"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert"
                      src="/typescript.png"
                      alt="ts Logo"
                      height="20"
                      width="20"
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
