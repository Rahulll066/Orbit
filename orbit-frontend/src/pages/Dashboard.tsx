import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'

function Dashboard() {

  const [modelOpen, setModelOpen] = useState(false);

  return (
    <div>
      <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-slate-100 border-2">     
      <CreateContentModel open={modelOpen} onClose={() => {
        setModelOpen(false);
      }}/>
      <div className='flex justify-end gap-2'>
      <Button onClick={() => {
        setModelOpen(true);
      }} variant='primary' text='Add Content' startIcon={<PlusIcon></PlusIcon>}></Button>
      <Button variant='secondary' text='Share Orbit' startIcon={<ShareIcon></ShareIcon>}></Button>
      </div>
      <div className='flex'>
      <Card type="twitter" link="https://x.com/DAIEvolutionHub/status/1987399813885772127?s=20"
      title="First tweet" />

      <Card type="youtube" link="https://youtu.be/lvO88XxNAzs?si=9j2bQsrq7Z7DY45_"
      title="First video" />

      <Card type="doc" link="https://docs.google.com/document/d/1hyBoOum6GKTK0j3kZWrgUpUxv_d0ha6ZP7jSCvYeOZQ/edit?usp=sharing"
      title="First doc" />
      </div>
      </div>
    </div>
  )
}


export default Dashboard