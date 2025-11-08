import './App.css'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Card } from './components/Card'
import { CreateContentModel } from './components/CreateContentModel'

function App() {

  return (
    <div className='p-4'>
      <CreateContentModel open={false}/>
      <div className='flex justify-end gap-2'>
      <Button variant='primary' text='Add Content' startIcon={<PlusIcon></PlusIcon>}></Button>
      <Button variant='secondary' text='Share Orbit' startIcon={<ShareIcon></ShareIcon>}></Button>
      </div>
      <div className='flex'>
      <Card type="twitter" link="https://x.com/Riki_web3/status/1987112069208879380?s=20"
      title="First tweet" />

      <Card type="youtube" link="https://youtu.be/5JoPeWHkKJg?si=F0NeHuRPWMOPUY2y"
      title="First video" />

      <Card type="doc" link="https://docs.google.com/document/d/1T0hIaE8nlmiInhPfDV1hPzK_RClHHv8gskvUS2zgfTY/edit?tab=t.0#heading=h.rjh9415jxg53"
      title="First doc" />
      </div>
    </div>
  )
}

export default App
