'use client';

import React, { useState } from 'react';
import Chip from '@/components/ui/Chip';
import Label from '@/components/ui/Label';
import Profile from '@/components/ui/Profile';
import Carousel from '@/components/ui/Carousel';
import Topbar from '@/components/ui/Topbar';
import ActionButton from '@/components/ui/ActionButton';
import Textarea from '@/components/ui/Textarea';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import BottomSheet from '@/components/ui/BottomSheet';

const Page = () => {
  const { toast } = useToast();
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
  const [textareaContent, setTextareaContent] = useState('');
  // bottomSheet
  const [isVisible, setIsVisible] = useState(false);
  const toggleBottomSheet = () => setIsVisible(!isVisible);

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
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦊 Profile</h1>
        <div className="flex h-[50px] gap-2">
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
        <div className="flex h-[50px] gap-2">
          <Profile items={profiles} lastLeft="left-[100px]" />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐯 Carousel</h1>
        <div className="flex h-[300px] gap-2">
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
      <section className="border-b p-3">
        <h1 className="pb-1">🐻‍❄️ Textarea</h1>
        <Textarea
          propObj={{
            placeholder: 'Placeholder',
            content: textareaContent,
            maxLength: 500
          }}
          onChange={e => setTextareaContent(e)}
        />
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🐨 FloatingActionButton</h1>
        <FloatingActionButton image="/next.svg" />
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦦 Toast</h1>
        <div className="flex flex-col gap-2">
          <Toaster />
          <Button
            onClick={() => {
              toast({
                title: 'Toast Title',
                description: '🦦 This is Toaster Text.'
              });
            }}
          >
            Show Toast
          </Button>
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦤 Input</h1>
        <div className="flex flex-col gap-2">
          <h1>default</h1>
          <Input helperText="Helper Text" />
        </div>
        <div className="flex flex-col gap-2">
          <h1>inactive</h1>
          <Input disabled />
        </div>
        <div className="flex flex-col gap-2">
          <h1>error state</h1>
          <Input helperText="Error Message" error />
        </div>
      </section>
      <section className="border-b p-3">
        <h1 className="pb-1">🦤 BottomSheet</h1>
        <button
          onClick={toggleBottomSheet}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
          Toggle Bottom Sheet
        </button>
        <BottomSheet
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          topBar={<div>Drag Bar</div>}
        >
          <div>Your Content Here</div>
        </BottomSheet>
      </section>
    </div>
  );
};

export default Page;
