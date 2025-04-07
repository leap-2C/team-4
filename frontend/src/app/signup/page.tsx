import React from 'react';

import { Coffee } from 'lucide-react';

const Page = () => {
    return (
        <div>
            <div className='w-1/2 h-[100vh] bg-[#FBBF24]'>
                <div className='flex flex-row gap-2 items-center'>
                    <Coffee />
                    <p className='text-black text-bold text-[20px]'>Buy me coffee</p>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Page;
