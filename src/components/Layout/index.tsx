// Next
import Head from "next/head";

// React
import type { FC, ReactElement } from "react";
import { memo } from "react";

// Interface
import ILayout from "./index.d";

// Components
import { Sidebar } from "components";

const Layout: FC<ILayout> = ({
    children,
    author,
    description,
    keywords,
    title
}: ILayout): ReactElement<ILayout> => {
  return(
    <>
        <Head>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {author && <meta name="author" content={author} />}
            {keywords && <meta name="keywords" content={keywords} />}
        </Head>

        <section className="flex flex-wrap">
          <aside className="h-screen">
            <Sidebar />
          </aside>
          {children && 
            <main className="flex-1 h-screen overflow-auto">{children}</main>
          }
        </section>
    </>
  );
};

export default memo(Layout);