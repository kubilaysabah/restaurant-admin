// Next
import type { NextPage } from "next";

// React
import type { ReactElement } from 'react';
import { memo } from 'react';

// Components
import { Layout, Orders } from "components";

const Home: NextPage = (): ReactElement => {
    return(
        <Layout>
            <Orders />
        </Layout>
    );
};

export default memo(Home);