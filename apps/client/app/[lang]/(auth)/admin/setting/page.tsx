import { getCurrentUser } from '@/lib/session'
import PasswordChangeForm from './components/PasswordChangeForm'

const SettingPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Change password
          </h1>
        </div>
        {user && <PasswordChangeForm user={user} />}
      </div>
    </div>
  )
}

export default SettingPage
