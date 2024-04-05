import { useEffect, useMemo, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { actionGetUserProfileByToken } from "pages/login/actions"
import { findPageByPath } from "utils/helps"
import { useDispatch } from "react-redux"
import { AIPT_WEB_TOKEN } from "./utils/constants/config"
import { Layout } from "antd"
import navigatePage from "utils/helps/navigate"
import pages from "pages"
import Cookies from "js-cookie"
import PageContent from "routes"
import api from "utils/service/api"
import * as actions from 'utils/constants/redux-actions'

import {
  AppHeader,
  AppSider,
  AppFooter
} from "./components"

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  window.navigatePage = (name, params = {}, query = {}) => navigatePage(navigate, name, params, query)
  const token = Cookies.get(AIPT_WEB_TOKEN)
  const currentPath = useLocation().pathname

  const isPublicPage = useMemo(() => {
    const page = findPageByPath(currentPath, pages)
    return !page?.auth
  }, [currentPath])

  


  
  const handleCheckNavigate = useCallback(() => {
    const paths = pages.map(page => page.path)
    if (!paths.includes(currentPath)) {
      window.location.href = '/'
    }
  }, [currentPath])

  // check navigate
  handleCheckNavigate()

  useEffect(() => {
    if (token) {

      actionGetUserProfileByToken(dispatch)
    }
    else if (!isPublicPage) {
      window.navigatePage('login')
    }
  }, [token])

  return (
    <Layout hasSider id="app">
      {!isPublicPage && <AppSider />}

      <Layout>
        {!isPublicPage && <AppHeader />}
        <PageContent />
        {!isPublicPage && <AppFooter />}
      </Layout>
    </Layout>
  )
}

export default App