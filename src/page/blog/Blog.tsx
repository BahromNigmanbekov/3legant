import { useTranslation } from "react-i18next"
import OurBlog from "../../components/ourblog/OurBlog"
import Join from "../../section/Join"


function Blog() {
  const { t } = useTranslation()
  return (
    <div className="mt-40">
      <h1 className="text-center text-5xl font-medium mt-24 mb-5">{t("blog")}</h1>
      <p className="text-center text-3xl mb-30">{t("home_ideas")}</p>
      <OurBlog/>
      <Join/>
    </div>
  )
}

export default Blog
