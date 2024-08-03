import {styled} from './styles'

const Button = styled('button', {
  backgroundColor: '$green300',
  borderRadius: '8px'
})

export default function Home() {
  return (
    <Button>Send</Button>
  );
}
