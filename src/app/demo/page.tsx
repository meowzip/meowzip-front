'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import Profile from '@/components/ui/Profile';
import Carousel from '@/components/ui/Carousel';
import Topbar from '@/components/ui/Topbar';
import ActionButton from '@/components/ui/ActionButton';

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
        <h1 className="pb-1">🦊 Profile</h1>
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
      <section className="border-b p-3">
        <h1 className="pb-1">🐯 Carousel</h1>
        <div className="flex gap-2 h-[300px]">
          <Carousel
            images={[
              'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&h=350',
              'http://www.catster.com/wp-content/uploads/2017/08/Pixiebob-cat.jpg',
              'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
              'https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
              'https://www.petmd.com/sites/default/files/petmd-cat-happy-13.jpg',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Cat-eating-prey.jpg/220px-Cat-eating-prey.jpg',
              'https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg',
              'https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg'
            ]}
          />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐻 Topbar</h1>
        <div className="flex flex-col gap-2">
          <Topbar type="home" />
          <Topbar type="page" title="title 1" />
          <Topbar type="modal" title="title 2" />
          <Topbar type="search" />
          <Topbar type="bottom" title="title 3" />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐼 ActionButton</h1>
        <div className="flex flex-col gap-2">
          <ActionButton icon="/images/icons/edit.svg" content="수정하기" />
          <ActionButton icon="/images/icons/delete.svg" content="삭제하기" />
        </div>
      </section>
    </div>
  );
};

export default Page;
