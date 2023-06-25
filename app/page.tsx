import { Folders, Keyboard, Terminal, Window } from "@/components";

export default function Home({ searchParams }: PropsWithParams) {
  return (
    <main className="grid h-screen grid-rows-[0.6fr_0.4fr] p-2">
      <section className="flex gap-2">
        <div className="grid basis-2/5 grid-cols-2 gap-2">
          <Window title={{ name: "PANEL", description: "SYSTEM" }} />
          <Window title={{ name: "PANEL", description: "NETWORK" }} />
        </div>
        <div className="flex-1">
          <Window title={{ name: "TERMINAL", description: "MAIN SHELL" }}>
            <div className="h-full border p-2">
              <Terminal />
            </div>
          </Window>
        </div>
      </section>
      <section className="flex">
        <div className="flex-1">
          <Window
            title={{
              name: "FILE SYSTEM",
              description:
                searchParams &&
                "path" in searchParams &&
                typeof searchParams.path === "string"
                  ? searchParams.path
                  : "/",
            }}
          >
            <div className="h-full">
              <Folders searchParams={searchParams} />
            </div>
          </Window>
        </div>
        <div className="hidden flex-1 md:block">
          <Keyboard />
        </div>
      </section>
    </main>
  );
}
