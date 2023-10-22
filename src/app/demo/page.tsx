'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Profile from '@/components/ui/Profile';

const Page = () => {
  const [chipObj, setChipObj] = useState({
    key: '1',
    content: 'chip1',
    checked: false
  });
  const [chipObj2, setChipObj2] = useState({
    key: '2',
    content: 'chip2',
    checked: false
  });
  const [profiles, setProfiles] = useState([
    {
      key: '1',
      src: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute '
    },
    {
      key: '2',
      src: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[20px]'
    },
    {
      key: '3',
      src: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[40px]'
    },
    {
      key: '4',
      src: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[60px]'
    },
    {
      key: '5',
      src: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[80px]'
    },
    {
      key: '6',
      src: 'https://github.com/shadcn.png',
      style: 'w-10 h-10 absolute left-[100px]'
    }
  ]);

  return (
    <div className="p-4">
      <section className="border-b p-3">
        <h1 className="pb-1">🐶 Button</h1>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => console.log('pr lg')}
          >
            primary
          </Button>
          <Button variant="primary" size="lg" disabled>
            primary
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => console.log('sc md')}
          >
            secondary
          </Button>
          <Button variant="tertiary" size="sm">
            tertiary
          </Button>
          <Button variant="outline" size="lg">
            outline
          </Button>
          <Button variant="text" icon="/images/icons/arrow.svg">
            text
          </Button>
          <Button variant="text" disabled>
            text
          </Button>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐱 Chip</h1>
        <div className="flex gap-2">
          <Chip
            propObj={chipObj}
            onClick={() =>
              setChipObj(prev => ({ ...prev, checked: !prev.checked }))
            }
          />
          <Chip
            propObj={chipObj2}
            onClick={() =>
              setChipObj2(prev => ({ ...prev, checked: !prev.checked }))
            }
            icon="/images/icons/time.svg"
          />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐭 Tabs</h1>
        <div className="flex gap-2">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐻 Label</h1>
        <div className="flex gap-2">
          <Label
            type="default"
            content="default label"
            icon="https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/home.svg"
          />
          <Label type="text" content="text label" />
          <Label
            type="icon"
            icon="https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/time.svg"
          />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐰 Badge</h1>
        <div className="flex gap-2">
          <Badge type="default" color="bg-pr-500" />
          <Badge
            type="icon"
            icon="https://nemo-erp-dev.s3.ap-northeast-2.amazonaws.com/bus/image/time.svg"
            color="bg-pr-500"
          />
          <Badge type="text" text="A" color="bg-pr-500" />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐰 Profile</h1>
        <div className="flex gap-2 h-[50px]">
          <Profile
            items={[
              {
                key: '1',
                src: 'https://github.com/shadcn.png',
                style: 'w-10 h-10'
              }
            ]}
            lastLeft="left-[100px]"
          />
        </div>
        <div className="flex gap-2 h-[50px]">
          <Profile items={profiles} lastLeft="left-[100px]" />
        </div>
      </section>
    </div>
  );
};

export default Page;
