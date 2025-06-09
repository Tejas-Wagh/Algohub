import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code, Sparkles, Zap } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className=" py-16 md:py-32 dark:bg-transparent" id="features">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Built to cover your needs
          </h2>
          <p className="mt-4">
            Our platform offers a powerful and intuitive environment to sharpen
            your coding skills.
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Extensive Problem Library</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Access a continuously growing collection of diverse coding
                challenges, carefully categorized by difficulty, topic, and even
                real-world interview scenarios. Each problem comes with clear
                descriptions and helpful examples to guide your solution.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Code className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Interactive Code Editor</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Write and test your code directly in our integrated editor,
                which supports multiple programming languages. Get immediate
                feedback on your submissions with detailed test case results,
                helping you quickly identify and fix errors.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">
                Personalized Progress Tracking
              </h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Stay on top of your learning journey with comprehensive
                tracking. See your solved problems, submission history, and
                performance trends over time, allowing you to easily identify
                strengths and areas that need more attention.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
