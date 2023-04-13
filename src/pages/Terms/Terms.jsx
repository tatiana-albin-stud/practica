import React, { useEffect, useState } from "react";
import { PageLayout } from "lib";
import AddTC from "./AddTC";
import { PrimaryButton } from "lib/components/Buttons/buttons";
import AcUnitIcon from "@mui/icons-material/AddCircleOutline";
import ShowTC from "./ShowTC";
import styles from "./Stilizare.module.scss";
import Details from "./Details";

const Terms = () => {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <PageLayout
      title="Documente importante"
      //subTitle="Subtitle"
      backArrow={true}
      actionArea={
        <>
          <PrimaryButton
            startIcon={<AcUnitIcon />}
            onClick={() => setOpenAdd(true)}
          >
            Adaugă
          </PrimaryButton>
        </>
      }
    >
      <ShowTC />
      <AddTC open={openAdd} setOpen={setOpenAdd} />
    </PageLayout>
  );
};

export default Terms;
