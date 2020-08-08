import Head from 'next/head'
import Card, { CardHeader, CardTitle, CardContent, CardButtonContainer } from '../components/card'
import { EDIT, NEW } from '../constants'
import Button from '../components/button'
import { GlobalStyle } from '../components/globalStyles'
import fireDb from '../utility/firebase'

export default () => {
  const clickclick = async () => {
    console.log(await fireDb.getTest())
  }
  return (
    <React.Fragment>
      <GlobalStyle/>
      <div>Login Page</div>

      <Card>
        <CardHeader>
          <CardTitle>Hi</CardTitle>
          <p>Some extra text</p>
          <CardButtonContainer>
            <Button type={EDIT} onClick={clickclick}>Hi there</Button>
          </CardButtonContainer>
        </CardHeader>
        <CardContent>Example usage of card component</CardContent>
      </Card>
    </React.Fragment>

  )
}