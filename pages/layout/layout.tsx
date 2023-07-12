import Header from './header'
import Footer from './footer'

export default function Layout({children}): JSX.Element {
    return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  )
}