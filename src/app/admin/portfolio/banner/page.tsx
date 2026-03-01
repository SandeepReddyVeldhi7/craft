"use client";
import BannerEditor from "../../../../components/admin/BannerEditor";

export default function PortfolioBannerAdmin() {
    return (
        <BannerEditor
            pageTitle="Portfolio Page"
            apiEndpoint="http://localhost:5000/api/portfolio/banner"
            backPath="/admin"
        />
    );
}
