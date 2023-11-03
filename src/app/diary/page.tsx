import Filter from '@/components/diary/Filter';

const page = () => {
  return (
    <div>
      <Filter
        propObj={{
          key: '1',
          image:
            'https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png',
          share: true
        }}
      />
      <Filter
        propObj={{
          key: '1',
          image:
            'https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_square.png',
          share: false
        }}
      />
    </div>
  );
};

export default page;
