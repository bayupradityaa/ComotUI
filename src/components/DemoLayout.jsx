import InteractivePlayground from "./InteractivePlayground";
import CodeViewer from "../demo/CodeViewer";

export default function DemoLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Left: Interactive Playground */}
      <div className="lg:sticky lg:top-20">
        <InteractivePlayground />
      </div>

      {/* Right: Source Code */}
      <div className="lg:sticky lg:top-20">
        <CodeViewer />
      </div>
    </div>
  );
}