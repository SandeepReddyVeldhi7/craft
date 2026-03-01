"use client";
import BannerEditor from "../../../../components/admin/BannerEditor";

export default function AboutBannerAdmin() {
    return (
        <BannerEditor
            pageTitle="About Page"
            apiEndpoint="http://localhost:5000/api/about/banner"
            backPath="/admin"
        />
    );
}
