'use client';

import UserProfile from "@/components/UserProfile";
import { useSearchParams } from 'next/navigation';

{/* <Link href="/home/1?visualizar=true">
 */}
export default function Page() {
    console.log('Page');
    const searchParams = useSearchParams();
    const visualizar = searchParams.get('visualizar');
    const isVisualizing = visualizar === 'true';

    console.log('isVisualizing', isVisualizing);

    return (
        <UserProfile isVisualizing={isVisualizing} />
    );
}