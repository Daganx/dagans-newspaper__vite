import ArticlesList from "../components/articles/latestArticles/latestArticles";
import Banner from "../components/banner/Banner";
import LatestArticlesBanner from "../components/articles/latestArticlesBanner/latestArticlesBanner";
import GuidesArticles from "../components/articles/guidesArticles/GuidesArticles";
import GuidesArticlesBanner from "../components/articles/guidesArticlesBanner/guidesArticlesBanner";
import NewsArticlesBanner from "../components/articles/newsArticlesBanner/NewsArticlesBanner";
import NewsArticles from "../components/articles/newsArticles/NewsArticles";
import ProjectsArticlesBanner from "../components/articles/projectsArticlesBanner/ProjectsArticlesBanner";
import ProjectsArticle from "../components/articles/projectsArticles/ProjectsArticles";

export default function IndexPage() {
  return (
    <>
      <Banner />
      <LatestArticlesBanner />
      <ArticlesList />
      <GuidesArticlesBanner />
      <GuidesArticles />
      <NewsArticlesBanner />
      <NewsArticles />
      <ProjectsArticlesBanner />
      <ProjectsArticle />
    </>
  );
}
