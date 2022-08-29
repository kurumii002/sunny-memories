/* eslint-disable react/display-name */
import { Suspense } from "react";
import LoadingBar from "./LoadingBar";

/**
 * Loadable - lazy loading
 * @param Component
 */
const Loadable = (Component: any) => (props: any) =>
	(
		<Suspense fallback={<LoadingBar />}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
