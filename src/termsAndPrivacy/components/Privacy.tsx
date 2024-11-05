// src/PrivacyPolicy.tsx
import React from "react";
import { Typography, Container, Box } from "@mui/material";
import InformationTable from "./PrivacyTable";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Box padding={3}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Last Updated: November 4, 2024
        </Typography>

        <Box marginTop={3}>
          <Typography paragraph>
            This privacy notice for CS82 group (“Company,” “we,” “us,” or
            “our“), describes how and why we might collect, store, use, and/or
            share (“process“) your information when you use our services
            (“Services“), such as when you:
            <ul>
              <li>
                Download and use our extension(s), Exthealth, or any other
                application of ours that links to this privacy notice
              </li>
              <li>
                Engage with us in other related ways ― including any sales,
                marketing, or events
              </li>
            </ul>
            Questions or concerns? Reading this privacy notice will help you
            understand your privacy rights and choices. If you do not agree with
            our policies and practices, please do not use our Services. If you
            still have any questions or concerns, please contact us at
            2021314140@dhvsu.edu.ph.
          </Typography>
          <Typography paragraph>
            This privacy policy was powered by Termly’s Privacy Policy
            Generator.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>
            SUMMARY OF KEYPOINTS
          </Typography>
          <Typography paragraph fontWeight="bold">
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by using our
            table of contents below to find the section you are looking for.
          </Typography>
          <Typography paragraph>
            <strong>What personal information do we process?</strong> We do not
            collect, use, or store any personal information.
          </Typography>
          <Typography paragraph>
            <strong>Do we process any sensitive personal information?</strong>{" "}
            We do not process sensitive personal information.
          </Typography>
          <Typography paragraph>
            <strong>Do you receive any information from third parties?</strong>{" "}
            No you do not receive any information from third parties.
          </Typography>
          <Typography paragraph>
            <strong>How do you process my information?</strong> We process the
            information you give to us to provide, improve, and administer our
            Services. We may also process the information you provide to us for
            other purposes with your consent. We process your information only
            when we have a valid legal reason to do so.
          </Typography>
          <Typography paragraph>
            <strong>
              In what situations and with which types of parties do we share
              personal information?
            </strong>{" "}
            As we do not collect personal information, we do not share personal
            information with any third parties.
          </Typography>
          <Typography paragraph>
            <strong>How do we keep your information safe?</strong> We have
            organizational and technical processes and procedures in place to
            protect the information you give to us, which is also stored in our
            database anonymously. However, no electronic transmission over the
            internet or information storage technology can be guaranteed to be
            100% secure, so we cannot promise or guarantee that hackers,
            cybercriminals, or other unauthorized third parties will not be able
            to defeat our security and improperly collect, access, steal, or
            modify your information.
          </Typography>
          <Typography paragraph>
            <strong>What are your rights? </strong> Depending on where you are
            located geographically, the applicable privacy law may mean you have
            certain rights regarding the information you give to us.
          </Typography>
          <Typography paragraph>
            <strong>How do I exercise my rights?</strong> The easiest way to
            exercise your rights is by contacting us. We will consider and act
            upon any request in accordance with applicable data protection laws.
          </Typography>
          <Typography paragraph>
            Want to learn more about what [Company Name] does with any
            information we collect? Review the notice in full below.
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            1. WHAT INFORMATION DO WE COLLECT?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We collect only the information you
            provide directly to us.
          </Typography>
          <Typography paragraph>
            We do not collect any personal or sensitive information like names,
            IP addresses, or browser data that can personally identify you.
          </Typography>
          <Typography paragraph>
            <strong>Application Data:</strong> If you use our application(s), we
            also may collect the following information if you choose to provide
            us with access or permission:
          </Typography>
          <ul>
            <li>
              <Typography paragraph>
                <strong>Twitter or X Feed Access:</strong> If enabled, the
                Extension reads your X feed, this are the posts you see on your
                X home page, to determine what are health-related posts. Data is
                sent to our servers only for processing and is not stored
                permanently. Your twitter feed will be sent or processed
                anonymously, making you unidentifiable.
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Context Menu Data:</strong> When using the Extension’s
                context menu features, text or image text passed through the
                menu is sent to our servers for processing. This data, unless
                for fact-checking, is not retained after processing.
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Submitted Data:</strong> Any data you submit for
                fact-checking is stored anonymously to improve the Extension's
                accuracy. No personally identifiable information is linked to
                submitted data.
              </Typography>
            </li>
            <li>
              <Typography paragraph>
                <strong>Push notification:</strong> We may request to send you
                push notifications regarding health tips. This is not affiliated
                with any account or personal information.
              </Typography>
            </li>
          </ul>
          <Typography paragraph fontWeight="bold">
            Information automatically collected
          </Typography>
          <Typography paragraph>
            <strong>In Short: </strong>Some information — such as your Internet
            Protocol (IP) address and/or browser and device characteristics — is
            collected automatically when you visit our Services.
          </Typography>
          <Typography>
            We automatically collect certain information when you visit, use, or
            navigate the Services. This information does not reveal your
            specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location,
            information about how and when you use our Services, and other
            technical information. This information is primarily needed to
            maintain the security and operation of our Services, and for our
            internal analytics and reporting purposes.
          </Typography>
          <Typography paragraph marginTop={3}>
            The following is a table summarizing the categories of data that we
            collect
          </Typography>
          <InformationTable />
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We process your information to provide,
            improve, and administer our Services, and to comply with law. We may
            also process the information you provide to us for other purposes
            with your consent.
          </Typography>
          <Typography paragraph fontWeight="bold">
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </Typography>
          <Typography paragraph>
            <ul>
              <li>
                To deliver and facilitate delivery of services to the user. We
                may process your information to provide you with the requested
                service.
              </li>
              <li>
                To protect our Services. We may process your information as part
                of our efforts to keep our Services safe and secure, including
                fraud monitoring and prevention.
              </li>
              <li>
                To evaluate and improve our Services, products, marketing, and
                user experience
              </li>
            </ul>
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We only process your personal information
            when we believe it is necessary and we have a valid legal reason
            (i.e., legal basis) to do so under applicable law, like with your
            consent, to comply with laws, to provide you with services to enter
            into or fulfill our contractual obligations, to protect your rights,
            or to fulfill our legitimate business interests.
          </Typography>
          <Typography paragraph>
            The General Data Protection Regulation (GDPR) and UK GDPR require us
            to explain the valid legal bases we rely on in order to process your
            personal information. As such, we may rely on the following legal
            bases to process your personal information:
          </Typography>
          <Typography paragraph>
            <ul>
              <li>
                Consent. We may process your information if you have given us
                permission (i.e., consent) to use your personal information for
                a specific purpose. You can withdraw your consent at any time.
              </li>
              <li>
                Performance of a Contract. We may process your personal
                information when we believe it is necessary to fulfill our
                contractual obligations to you, including providing our Services
                or at your request prior to entering into a contract with you.
              </li>
              <li>
                Legitimate Interests. We may process your information when we
                believe it is reasonably necessary to achieve our legitimate
                business interests and those interests do not outweigh your
                interests and fundamental rights and freedoms. For example, we
                may process your personal information for some of the purposes
                described in order to:
                <ul>
                  <li>
                    Send users information about special offers and discounts on
                    our products and services
                  </li>
                  <li>
                    Develop and display personalized and relevant advertising
                    content for our users
                  </li>
                  <li>
                    Analyze how our services are used so we can improve them to
                    engage and retain users
                  </li>
                  <li>Support our marketing activities</li>
                  <li>
                    Diagnose problems and/or prevent fraudulent activities
                  </li>
                  <li>
                    Understand how our users use our products and services so we
                    can improve user experience
                  </li>
                </ul>
              </li>
              <li>
                Legal Obligations. We may process your information where we
                believe it is necessary for compliance with our legal
                obligations, such as to cooperate with a law enforcement body or
                regulatory agency, exercise or defend our legal rights, or
                disclose your information as evidence in litigation in which we
                are involved.
              </li>
              <li>
                Vital Interests. We may process your information where we
                believe it is necessary to protect your vital interests or the
                vital interests of a third party, such as situations involving
                potential threats to the safety of any person.
              </li>
            </ul>
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We may share information in specific
            situations described in this section and/or with the following
            categories of third parties.
          </Typography>
          <Typography paragraph>
            Vendors, Consultants, and Other Third-Party Service Providers. We
            may share your data with third-party vendors, service providers,
            contractors, or agents (“third parties”) who perform services for us
            or on our behalf and require access to such information to do that
            work. We have contracts in place with our third parties, which are
            designed to help safeguard your personal information. This means
            that they cannot do anything with your personal information unless
            we have instructed them to do it. They will also not share your
            personal information with any organization apart from us. They also
            commit to protect the data they hold on our behalf and to retain it
            for the period we instruct. The categories of third parties we may
            share personal information with are as follows:
            <ul>
              <li>Cloud Computing Services</li>
              <li>Data Analytics Services</li>
              <li>Data Storage Service Providers</li>
              <li>Government Entities</li>
              <li>Social Networks</li>
              <li>Testing Tools</li>
              <li>Hosting Service Providers</li>
            </ul>
          </Typography>
          <Typography paragraph>
            We also may need to share your personal information in the following
            situations:
          </Typography>
          <Typography>
            <ul>
              <li>
                Business Transfers. We may share or transfer your information in
                connection with, or during negotiations of, any merger, sale of
                company assets, financing, or acquisition of all or a portion of
                our business to another company.
              </li>
            </ul>
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We are not responsible for the safety of
            any information that you share with third parties that we may link
            to or who advertise on our Services, but are not affiliated with,
            our Services.
          </Typography>
          <Typography paragraph>
            The Services, may link to third-party websites, online services, or
            mobile applications and/or contain advertisements from third parties
            that are not affiliated with us and which may link to other
            websites, services, or applications. Accordingly, we do not make any
            guarantee regarding any such third parties, and we will not be
            liable for any loss or damage caused by the use of such third-party
            websites, services, or applications. The inclusion of a link towards
            a third-party website, service, or application does not imply an
            endorsement by us. We cannot guarantee the safety and privacy of
            data you provide to any third parties. Any data collected by third
            parties is not covered by this privacy notice. We are not
            responsible for the content or privacy and security practices and
            policies of any third parties, including other websites, services,
            or applications that may be linked to or from the Services. You
            should review the policies of such third parties and contact them
            directly to respond to your questions.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </Typography>
          <Typography paragraph>
            No we do not use cookies or any other tracking technologies.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            7. IS THE INFORMATION YOU GIVE TO US TRANSFERRED INTERNATIONALLY?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We may transfer, store, and process your
            information in countries other than your own.
          </Typography>
          <Typography paragraph>
            Our servers are located in Philippines. If you are accessing our
            Services from outside Philippines, please be aware that your
            information may be transferred to, stored, and processed by us in
            our facilities and by those third parties with whom we may share
            your personal information (see “WHEN AND WITH WHOM DO WE SHARE YOUR
            PERSONAL INFORMATION?” above), in Philippines, and other countries.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            8. HOW LONG DO WE KEEP YOUR INFORMATION?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We keep your information for as long as
            necessary to fulfill the purposes outlined in this privacy notice
            unless otherwise required by law.
          </Typography>
          <Typography paragraph>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements). No purpose in this
            notice will require us keeping your personal information for longer
            than 6 months past the start of the idle period of the user’s
            account. When we have no ongoing legitimate business need to process
            your personal information, we will either delete or anonymize such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            9. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </Typography>
          <Typography paragraph>
            <strong>In Short:</strong> We aim to protect your personal
            information through a system of organizational and technical
            security measures.
          </Typography>
          <Typography paragraph>
            We have implemented appropriate and reasonable technical and
            organizational security measures designed to protect the security of
            any personal information we process. However, despite our safeguards
            and efforts to secure your information, no electronic transmission
            over the Internet or information storage technology can be
            guaranteed to be 100% secure, so we cannot promise or guarantee that
            hackers, cybercriminals, or other unauthorized third parties will
            not be able to defeat our security and improperly collect, access,
            steal, or modify your information. Although we will do our best to
            protect your personal information, transmission of personal
            information to and from our Services is at your own risk. You should
            only access the Services within a secure environment.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            10. DO WE COLLECT INFORMATION FROM MINORS?
          </Typography>
          <Typography paragraph>
            <strong>In Short: </strong>We do not knowingly collect data from or
            market to children under 18 years of age.
          </Typography>
          <Typography paragraph>
            We do not knowingly solicit data from or market to children under 18
            years of age. By using the Services, you represent that you are at
            least 18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent’s use of the Services. If we learn
            that personal information from users less than 18 years of age has
            been collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records. If you
            become aware of any data we may have collected from children under
            age 18, please contact us at 2021314140@dhvsu.edu.ph.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
            11. DO WE MAKE UPDATES TO THIS NOTICE?
          </Typography>
          <Typography paragraph>
            <strong>In Short: </strong>Yes, we will update this notice as
            necessary to stay compliant with relevant laws.
          </Typography>
          <Typography paragraph>
            We may update this privacy notice from time to time. The updated
            version will be indicated by an updated “Revised” date and the
            updated version will be effective as soon as it is accessible. If we
            make material changes to this privacy notice, we may notify you
            either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
          12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </Typography>
          <Typography paragraph>
            <strong>In Short: </strong>Yes, we will update this notice as
            necessary to stay compliant with relevant laws.
          </Typography>
          <Typography paragraph>
            We may update this privacy notice from time to time. The updated
            version will be indicated by an updated “Revised” date and the
            updated version will be effective as soon as it is accessible. If we
            make material changes to this privacy notice, we may notify you
            either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="h5" gutterBottom>
          13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
          </Typography>
          <Typography paragraph>
            <strong>In Short: </strong>Yes, we will update this notice as
            necessary to stay compliant with relevant laws.
          </Typography>
          <Typography paragraph>
          Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please contact us.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
