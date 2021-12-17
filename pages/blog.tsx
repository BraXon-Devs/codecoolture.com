import { GetStaticProps } from "next";
import NextLink from "next/link";
import React from "react";
import { Heading } from "../components/Heading";
import { Link } from "../components/Link";
import { Text } from "../components/Text";
import { getConfig } from "../config";
import { Article } from "../entities/Article";
import { Application } from "../layouts/Application";
import { Theme } from "../layouts/Application/Theme";
import { Posts } from "../layouts/Posts";
import { MarkdownRepository } from "../repositories/MardownRepository";

interface ArticlesProps {
  articles: Article[];
}

export default class Articles extends React.Component<ArticlesProps> {
  public render() {
    return (
      <Application theme={Theme.Light}>
        <Application.Article>
          <Heading el="h1" size="xl">
            Blog
          </Heading>

          <Text>
            Textos sobre diseño de software, código sostenible o entrega continua de valor. Para textos más cortos,
            puedes visitar la sección de{" "}
            <NextLink href="/notes" passHref>
              <Link>Notas</Link>
            </NextLink>
            .
          </Text>

          <Posts posts={this.props.articles || []} />
        </Application.Article>
      </Application>
    );
  }
}

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const repository = await MarkdownRepository.fromDirectory(getConfig().writing.articles);

  const articles = await repository.all();

  return { props: { articles } };
};
