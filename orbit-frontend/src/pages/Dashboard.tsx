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
      <Card type="twitter" link="https://x.com/Riki_web3/status/1987112069208879380?s=20"
      title="First tweet" />

      <Card type="youtube" link="https://youtu.be/HzF6kyS3Fb8?si=-N91KbJVcfRnBxx4"
      title="First video" />

      <Card type="doc" link="https://docs.google.com/document/d/1T0hIaE8nlmiInhPfDV1hPzK_RClHHv8gskvUS2zgfTY/edit?tab=t.0#heading=h.rjh9415jxg53"
      title="First doc" />
      </div>
      </div>
    </div>
  )
}


export default Dashboard