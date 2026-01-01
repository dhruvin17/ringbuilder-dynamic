import { useEffect, useState } from "react";
import { useLoaderData, useActionData, useNavigation, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Page,
  Layout,
  Button,
  Frame,
  BlockStack,
  Select,
  Toast,
  Loading
} from "@shopify/polaris";

// SHOPIFY_API_KEY=083c9ee05d73868b59a538b8c094bd38
// SHOPIFY_API_SECRET=e148a4d63d72eab65fe445ef8d1d4e20
// SCOPES=read_content,read_online_store_pages,unauthenticated_read_content,write_products

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  // 1. Fetch collections
  const collectionsQuery = `
    query {
      collections(first: 50) {
        edges {
          node {
            id
            handle
            title
          }
        }
      }
    }
  `;
  const collectionsRes = await admin.graphql(collectionsQuery);
  const collectionsData = await collectionsRes.json();
  const collections = collectionsData.data.collections.edges.map((e) => e.node);

  // 2. Fetch pages
  const pagesQuery = `
    query {
      pages(first: 50) {
        edges {
          node {
            id
            handle
            title
          }
        }
      }
    }
  `;
  const pagesRes = await admin.graphql(pagesQuery);
  const pagesData = await pagesRes.json();
  const pages = pagesData.data.pages.edges.map((e) => e.node);

  // 3. Fetch shop metafield (config)
  const metafieldQuery = `
    query {
      shop {
        metafield(namespace: "custom", key: "ringbuilderconfig") {
          id
          value
        }
      }
    }
  `;
  const metafieldRes = await admin.graphql(metafieldQuery);
  const metafieldData = await metafieldRes.json();
  const config = metafieldData.data.shop.metafield
    ? JSON.parse(metafieldData.data.shop.metafield.value)
    : {};

  return { collections, pages, config };
}

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const config = formData.get("config");

  // ✅ 1. Fetch current shop ID
 let shopId;

  try {
    // Try to fetch current shop ID
    const shopQuery = `query { shop { id } }`;
    const shopRes = await admin.graphql(shopQuery);
    const shopJson = await shopRes.json();

    shopId = shopJson?.data?.shop?.id || null;
  } catch (err) {
    console.error("Error fetching shopId:", err);
  }

  if (!shopId) {
    // ❌ Couldn’t find shopId → return error
    return {
      status: "error",
      error: "Unable to fetch shop ID. Please re-authenticate the app.",
    };
  }

  const mutation = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          namespace
          key
          value
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    metafields: [
      {
        namespace: "custom",
        key: "ringbuilderconfig",
        type: "json",
        value: config,
        ownerId: shopId,
      },
    ],
  };

  try {
    const res = await admin.graphql(mutation, { variables });
    const json = await res.json();

    if (json.data?.metafieldsSet?.userErrors?.length > 0) {
      return { status: "error", error: json.data.metafieldsSet.userErrors[0].message };
    }

    return { status: "success", success: "Ring Bulider Data saved successfully." };
  } catch (err) {
    return { status: "error", error: err.message || "Something went wrong." };
  }
}

export default function Index() {
  const { collections, pages, config } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();

  const [localConfig, setLocalConfig] = useState(config);
  const [toast, setToast] = useState(null);

  function updateFeature(feature, value) {
    setLocalConfig({
      ...localConfig,
      [feature]: value,
    });
  }

  // Show toast when actionData changes
  useEffect(() => {
    if (actionData?.status === "success") {
      setToast({ content: actionData.success, error: false });
    } else if (actionData?.status === "error") {
      setToast({ content: actionData.error, error: true });
    }
  }, [actionData]);

  const collectionOptions = collections.map((c) => ({
    label: c.title,
    value: c.handle,
  }));

  const pageOptions = pages.map((p) => ({
    label: p.title,
    value: p.handle,
  }));

  const isSubmitting = navigation.state === "submitting";

  return (
    <Frame>
      {isSubmitting && <Loading />}
      {toast && (
        <Toast
          content={toast.content}
          error={toast.error}
          onDismiss={() => setToast(null)}
        />
      )}
      <Page title="Ring Builder">
        <Layout>
          <Layout.Section>
            <Form method="post">
              <BlockStack gap="500">
                {/* Ring List */}
                <Select
                  label="Ring List Collection"
                  options={collectionOptions}
                  value={localConfig["ring-list"] || ""}
                  onChange={(value) => updateFeature("ring-list", value)}
                />

                {/* Ring Detail */}
                <Select
                  label="Ring Detail Collection"
                  options={collectionOptions}
                  value={localConfig["ring-detail"] || ""}
                  onChange={(value) => updateFeature("ring-detail", value)}
                />

                {/* Diamond List */}
                <Select
                  label="Start With Diamond Page"
                  options={pageOptions}
                  value={localConfig["diamond-list"] || ""}
                  onChange={(value) => updateFeature("diamond-list", value)}
                />

                {/* Diamond Details */}
                <Select
                  label="View Diamond Page"
                  options={pageOptions}
                  value={localConfig["diamond-details"] || ""}
                  onChange={(value) => updateFeature("diamond-details", value)}
                />

                {/* Complete Ring */}
                <Select
                  label="Complete Ring Page"
                  options={pageOptions}
                  value={localConfig["complete-ring"] || ""}
                  onChange={(value) => updateFeature("complete-ring", value)}
                />

                {/* Hidden input for Remix */}
                <input
                  type="hidden"
                  name="config"
                  value={JSON.stringify(localConfig)}
                />

                <Button submit variant="primary" loading={isSubmitting}>
                  Save
                </Button>
              </BlockStack>
            </Form>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}