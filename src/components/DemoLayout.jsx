import InteractivePlayground from "./InteractivePlayground";
import CodeViewer from "./CodeViewer";

export default function DemoLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div className="lg:sticky lg:top-20">
        <InteractivePlayground />
      </div>
      <div className="lg:sticky lg:top-20">
        <CodeViewer />
      </div>
    </div>
  );
}