import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader bubble="?" eyebrow="Not found" title="No sheet at this reference"
        trail={[{ name: "Home", path: "/" }, { name: "Not found", path: "/404/" }]}
        lede="That page does not exist. It may have been renamed, or the link may be mistyped." />
      <section className="sheet">
        <div className="wrap">
          <div className="cta__btns">
            <Link className="btn" href="/">Back to the front page</Link>
            <Link className="btn btn--ghost" href="/works/">See the works</Link>
          </div>
        </div>
      </section>
    </>
  );
}
