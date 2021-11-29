const localStorageClearData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
}

export default localStorageClearData;