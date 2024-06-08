import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
function ProtectedRoute({children}:{children:React.ReactNode}) {
    const {isAuthenticated,isLoading}=useKindeAuth();
    if (!isLoading && !isAuthenticated) {
        window.location.href='/'
    }
  return (
    <>{children}</>
  )
}

export default ProtectedRoute