import { Suspense } from "react";
import ClassDiscoveryTest from "./components/ClassDiscoveryTest";
import LoadingSpinner from "./components/ui/LoadingSpinner";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <ClassDiscoveryTest />
      </Suspense>
    </div>
  );
}
