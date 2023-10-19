import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SEND_ID,
    pass: process.env.EMAIL_SEND_PASSWORD,
  },
})

function formatPrice(value) {
  return `${new Intl.NumberFormat('ja-JP', {
    // style: 'currency',
    // currency: 'JPY',
  }).format(Number(value))}円`
}

const sendContactEmail = (contact, lang) => {
  try {
    const { name, email, message, phone } = contact
    const emailContent = `
    <div
      style="
        background-color: white;
        font-family: 'Open Sans', sans-serif;
        margin: 0 auto;
        color: #333333;
        font-size: 16px;
        max-width: 1024px;
        min-height: 100vh;
      "
    >
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; padding: 25px 50px; color: #ffffff; background: #ec1e26"
      >
        <tbody>
          <tr>
            <td style="font-size: 16px; margin-bottom: 5px">Notification</td>
          </tr>
          <tr>
            <td
              style="text-transform: uppercase; font-size: 22px; font-weight: bold"
            >
              NEW CONTACT FORM SUBMISSION
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style="
          width: 90%;
          background-color: white;
          height: 100%;
          margin: 0 auto;
          padding-top: 10px;
        "
      >
        <div>
          <b
            style="
              font-weight: 600;
              padding-bottom: 1px;
              font-size: 16px;
              color: black;
            "
            >Contact Information</b
          >
          <hr style="border-bottom: 0 #333333" />
          <div style="margin-top: 10px; width: 100%">
            <div style="margin-left: 5%; margin-top: 20px">
              <span style="font-size: 15px"
                >Name: <b>${name}</b></span
              ><br />
              <span style="font-size: 15px">Email: <b>${email}</b></span><br />
              <span style="font-size: 15px">Phone: <b>${phone}</b></span><br />
              <span style="font-size: 15px">Message: <b>${message}</b></span><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  `
    // Define the email data
    const mailOptions = {
      from: process.env.EMAIL_SEND_ID,
      to: email,
      subject: '[YK-CONTACT] NEW CONTACT FORM SUBMISSION',
      html: emailContent,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const sendOrderConfirmationEmail = (order, lang) => {
  try {
    const { name, email, message, phone, address, products, total } = order

    const emailContentEnglish = `
  <div
    style="
      background-color: white;
      font-family: 'Open Sans', sans-serif;
      margin: 0 auto;
      color: #333333;
      font-size: 16px;
      max-width: 1024px;
      min-height: 100vh;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="width: 100%; padding: 25px 50px; color: #ffffff; background: #283bbe"
    >
      <tbody>
        <tr>
          <td style="font-size: 16px; margin-bottom: 5px">Notification</td>
        </tr>
        <tr>
          <td
            style="text-transform: uppercase; font-size: 22px; font-weight: bold"
          >
            ORDER CONFIRMATION
          </td>
        </tr>
      </tbody>
    </table>
    <div
      style="
        width: 90%;
        background-color: white;
        height: 100%;
        margin: 0 auto;
        padding-top: 10px;
      "
    >
      <p>
        Thank you <b>${name}</b> for your trust and choosing Ykshoji,<br />
        Your order has been received and is being processed.<br />
        Below are the details of your order:
      </p>
      <div>
        <b
          style="
            font-weight: 600;
            padding-bottom: 1px;
            font-size: 16px;
            color: black;
          "
          >Customer Information</b
        >
        <hr style="border-bottom: 0 #333333" />
        <div style="margin-top: 10px; width: 100%">
          <div style="margin-left: 5%; margin-top: 20px">
            <span style="font-size: 15px"
              >Name: <b>${name}</b></span
            ><br />
            <span style="font-size: 15px">Email: <b>${email}</b></span><br />
            <span style="font-size: 15px">Phone: <b>${phone}</b></span><br />
            <span style="font-size: 15px">Address: <b>${address}</b></span><br />
            <span style="font-size: 15px">Message: <b>${message}</b></span><br />
          </div>
        </div>
      </div>

      <div style="margin-top: 20px">
        <b
          style="
            font-weight: 600;
            padding-bottom: 1px;
            font-size: 16px;
            color: black;
          "
          >Order Information</b
        >
        <hr style="border-bottom: 0 #333333" />

        <table
          style="
            color: #636363;
            border: 1px solid #e5e5e5;
            vertical-align: middle;
            width: 100%;
            border-collapse: collapse;
            font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
          "
        >
          <thead>
            <tr>
              <th
                style="
                  color: #636363;
                  border: 1px solid #e5e5e5;
                  vertical-align: middle;
                  padding: 12px;
                  text-align: left;
                "
              >
                Product
              </th>
              <th
                style="
                  color: #636363;
                  border: 1px solid #e5e5e5;
                  vertical-align: middle;
                  padding: 12px;
                  text-align: left;
                "
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody>
          ${products
            .map(
              (product) => `
                <tr>
                  <td
                    style="
                      color: #636363;
                      border: 1px solid #e5e5e5;
                      padding: 12px;
                      text-align: left;
                      vertical-align: middle;
                      font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                        sans-serif;
                      word-wrap: break-word;
                    "
                  >
                    ${product.name}
                  </td>
                  <td
                    style="
                      color: #636363;
                      border: 1px solid #e5e5e5;
                      padding: 12px;
                      text-align: left;
                      vertical-align: middle;
                      font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                        sans-serif;
                      word-wrap: break-word;
                    "
                  >
                    ${formatPrice(product.price)}
                  </td>
                </tr>
              `
            )
            .join('')}
          </tbody>
        </table>
      </div>
      <h3 style="text-align: right">Total: ${formatPrice(total)}</h3>
    </div>
  </div>
`

    const emailContentVietnamese = `
<div
  style="
    background-color: white;
    font-family: 'Open Sans', sans-serif;
    margin: 0 auto;
    color: #333333;
    font-size: 16px;
    max-width: 1024px;
    min-height: 100vh;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="width: 100%; padding: 25px 50px; color: #ffffff; background: #283bbe"
  >
    <tbody>
      <tr>
        <td style="font-size: 16px; margin-bottom: 5px">Thông báo</td>
      </tr>
      <tr>
        <td
          style="text-transform: uppercase; font-size: 22px; font-weight: bold"
        >
          XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG
        </td>
      </tr>
    </tbody>
  </table>
  <div
    style="
      width: 90%;
      background-color: white;
      height: 100%;
      margin: 0 auto;
      padding-top: 10px;
    "
  >
    <p>
      Cám ơn bạn <b>${name}</b> đã tin tưởng và lựa chọn Ykshoji,<br />
      Đơn hàng đang được tiếp nhận và đang trong quá trình xử lý.<br />
      Dưới đây là chi tiết về đơn hàng của bạn:
    </p>
    <div>
      <b
        style="
          font-weight: 600;
          padding-bottom: 1px;
          font-size: 16px;
          color: black;
        "
        >Thông tin khách hàng</b
      >
      <hr style="border-bottom: 0 #333333" />
      <div style="margin-top: 10px; width: 100%">
        <div style="margin-left: 5%; margin-top: 20px">
          <span style="font-size: 15px"
            >Tên: <b>${name}</b></span
          ><br />
          <span style="font-size: 15px">Email: <b>${email}</b></span><br />
          <span style="font-size: 15px">Số điện thoại: <b>${phone}</b></span><br />
          <span style="font-size: 15px">Địa chỉ: <b>${address}</b></span><br />
          <span style="font-size: 15px">Tin nhắn: <b>${message}</b></span><br />
        </div>
      </div>
    </div>

    <div style="margin-top: 20px">
      <b
        style="
          font-weight: 600;
          padding-bottom: 1px;
          font-size: 16px;
          color: black;
        "
        >Thông tin đơn hàng</b
      >
      <hr style="border-bottom: 0 #333333" />

      <table
        style="
          color: #636363;
          border: 1px solid #e5e5e5;
          vertical-align: middle;
          width: 100%;
          border-collapse: collapse;
          font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
        "
      >
        <thead>
          <tr>
            <th
              style="
                color: #636363;
                border: 1px solid #e5e5e5;
                vertical-align: middle;
                padding: 12px;
                text-align: left;
              "
            >
              Sản phẩm
            </th>
            <th
              style="
                color: #636363;
                border: 1px solid #e5e5e5;
                vertical-align: middle;
                padding: 12px;
                text-align: left;
              "
            >
              Giá
            </th>
          </tr>
        </thead>
        <tbody>
        ${products
          .map(
            (product) => `
              <tr>
                <td
                  style="
                    color: #636363;
                    border: 1px solid #e5e5e5;
                    padding: 12px;
                    text-align: left;
                    vertical-align: middle;
                    font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                      sans-serif;
                    word-wrap: break-word;
                  "
                >
                  ${product.name}
                </td>
                <td
                  style="
                    color: #636363;
                    border: 1px solid #e5e5e5;
                    padding: 12px;
                    text-align: left;
                    vertical-align: middle;
                    font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                      sans-serif;
                    word-wrap: break-word;
                  "
                >
                  ${formatPrice(product.price)}円
                </td>
              </tr>
            `
          )
          .join('')}
        </tbody>
      </table>
    </div>
    <h3 style="text-align: right">Tổng cộng: ${formatPrice(total)}</h3>
  </div>
</div>
`

    const emailContentJapanese = `
<div
  style="
    background-color: white;
    font-family: 'Open Sans', sans-serif;
    margin: 0 auto;
    color: #333333;
    font-size: 16px;
    max-width: 1024px;
    min-height: 100vh;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="width: 100%; padding: 25px 50px; color: #ffffff; background: #283bbe"
  >
    <tbody>
      <tr>
        <td style="font-size: 16px; margin-bottom: 5px">通知</td>
      </tr>
      <tr>
        <td
          style="text-transform: uppercase; font-size: 22px; font-weight: bold"
        >
          注文確認
        </td>
      </tr>
    </tbody>
  </table>
  <div
    style="
      width: 90%;
      background-color: white;
      height: 100%;
      margin: 0 auto;
      padding-top: 10px;
    "
  >
    <p>
    <b>${name}さん</b>、ご注文いただき、ありがとうございます。<br />
      ご注文は受け付けました。現在、処理中です。<br />
      以下はご注文の詳細です：
    </p>
    <div>
      <b
        style="
          font-weight: 600;
          padding-bottom: 1px;
          font-size: 16px;
          color: black;
        "
        >顧客情報</b
      >
      <hr style="border-bottom: 0 #333333" />
      <div style="margin-top: 10px; width: 100%">
        <div style="margin-left: 5%; margin-top: 20px">
          <span style="font-size: 15px"
            >お名前: <b>${name}</b></span
          ><br />
          <span style="font-size: 15px">メールアドレス: <b>${email}</b></span
          ><br />
          <span style="font-size: 15px">電話番号: <b>${phone}</b></span><br />
          <span style="font-size: 15px">住所: <b>${address}</b></span><br />
          <span style="font-size: 15px">メッセージ: <b>${message}</b></span><br />
        </div>
      </div>
    </div>

    <div style="margin-top: 20px">
      <b
        style="
          font-weight: 600;
          padding-bottom: 1px;
          font-size: 16px;
          color: black;
        "
        >注文情報</b
      >
      <hr style="border-bottom: 0 #333333" />

      <table
        style="
          color: #636363;
          border: 1px solid #e5e5e5;
          vertical-align: middle;
          width: 100%;
          border-collapse: collapse;
          font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
        "
      >
        <thead>
          <tr>
            <th
              style="
                color: #636363;
                border: 1px solid #e5e5e5;
                vertical-align: middle;
                padding: 12px;
                text-align: left;
              "
            >
              商品
            </th>
            <th
              style="
                color: #636363;
                border: 1px solid #e5e5e5;
                vertical-align: middle;
                padding: 12px;
                text-align: left;
              "
            >
              価格
            </th>
          </tr>
        </thead>
        <tbody>
        ${products
          .map(
            (product) => `
              <tr>
                <td
                  style="
                    color: #636363;
                    border: 1px solid #e5e5e5;
                    padding: 12px;
                    text-align: left;
                    vertical-align: middle;
                    font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                      sans-serif;
                    word-wrap: break-word;
                  "
                >
                  ${product.name}
                </td>
                <td
                  style="
                    color: #636363;
                    border: 1px solid #e5e5e5;
                    padding: 12px;
                    text-align: left;
                    vertical-align: middle;
                    font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                      sans-serif;
                    word-wrap: break-word;
                  "
                >
                  ${formatPrice(product.price)}
                </td>
              </tr>
            `
          )
          .join('')}
        </tbody>
      </table>
    </div>
    <h3 style="text-align: right">合計: ${formatPrice(total)}</h3>
  </div>
</div>
`

    let emailContent = ''

    if (lang === 'en') {
      emailContent = emailContentEnglish
    } else if (lang === 'vi') {
      emailContent = emailContentVietnamese
    } else {
      emailContent = emailContentJapanese
    }

    const subject =
      lang === 'en'
        ? 'Order Confirmation'
        : lang === 'vi'
        ? 'XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG'
        : '注文確認'

    // Define the email data
    const mailOptions = {
      from: process.env.EMAIL_SEND_ID,
      to: email,
      subject,
      html: emailContent,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export { sendOrderConfirmationEmail, sendContactEmail }
