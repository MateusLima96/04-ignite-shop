import {styled} from './styles'

const Button = styled('button', {
  backgroundColor: '$rocketseat',
  borderRadius: '8px'
})

export default function Home() {
  return (
    <Button>Send</Button>
  );
}
