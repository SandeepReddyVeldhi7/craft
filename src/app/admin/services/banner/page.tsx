"use client";
import BannerEditor from "../../../../components/admin/BannerEditor";

export default function ServicesBannerAdmin() {
    return (
        <BannerEditor
            pageTitle="Services Page"
            apiEndpoint="http://localhost:5000/api/services/banner"
            backPath="/admin"
        />
    );
}
