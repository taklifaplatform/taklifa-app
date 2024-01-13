import { Authenticated } from "@refinedev/core";

export default function CatchAll() {
  return (
    // This will redirect the user if they're not authenticated depending on the response of `authProvider.check`.
    <Authenticated>
      <div>This page is not found.</div>
    </Authenticated>
  );
}
