import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function CallToAction() {
  const user = await currentUser();
  let url = "/sign-in";

  if (user?.id) {
    url = "/problems";
  }

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Take the First Step
          </h2>
          <p className="mt-4">
            Practice real-world problems, write and run code instantly, and
            build skills that matter.{" "}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href={url}>
                <span>Begin Now</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
