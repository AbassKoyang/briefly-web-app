export const toastStyles = {
    error: {
        position: "top-center" as const,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light" as const,
        style: {
            background: '#ffffff',
            color: '#dc2626',
            border: '2px solid #dc2626',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '500',
            minWidth: '300px'
        }
    },
    errorSimple: {
        position: "top-center" as const,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light" as const,
        style: {
            background: '#ffffff',
            color: '#dc2626',
            border: '2px solid #dc2626',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '500'
        }
    }
  }