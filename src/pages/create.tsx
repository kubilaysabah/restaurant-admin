// Next
import type { NextPage } from "next";

// React
import type { ReactElement } from 'react';
import { memo } from 'react';

// Components
import { Layout, CreateOrder } from "components";

const Create: NextPage = (): ReactElement => {
    return(
        <Layout>
            <CreateOrder />
        </Layout>
    );
};

export default memo(Create);