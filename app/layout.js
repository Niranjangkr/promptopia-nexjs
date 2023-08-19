import '@styles/globals.css';
import Nav from'@components/Nav'
import Provider from '@components/Provider';

export const metadata = {
  title: "promptopia",
  description: "Discover and Share AI Prompts"
}

export default function RootLayout({ children }) {
 return (
    <html>
      <body>
        <div className='main'>
            <div className='gradient'/>
        </div>
        <Provider>
          <main className='app'>
          < Nav /> 
            {children}
          </main>
          </Provider>
      </body> 
    </html>
  )
}
