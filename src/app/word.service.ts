import { saveAs } from 'file-saver';
import { Injectable } from '@angular/core';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { order } from './interface';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private _ToastrService:ToastrService) { }
  generateWordFile(invoiceData: order): void 
  {
    
   
 
     const doc = new Document({
      sections:[
        {
          children:[
            new Paragraph(
              {
                children:[
                  new TextRun({ text: `Order # ${invoiceData.orderNo}`, bold: true, size: 28 }),
                ]
              }
            ),
            new Paragraph({
              text: `Payment via ${invoiceData.deliveryService} Paid on ${invoiceData.city} at ${invoiceData.created_at}`,
              spacing: { before: 200, after: 200 },
            }),
            new Paragraph({
              children: [new TextRun({ text: "Status: ", bold: true }), new TextRun(invoiceData.status)],
            }),
            new Paragraph({
              text: "Billing Information:",
              heading: "Heading1",
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `City: ${invoiceData.city}`, break: 1 }),
                new TextRun({ text: `Zone: ${invoiceData.zone}`, break: 1 }),
                new TextRun({ text: `Location: ${invoiceData.location}`, break: 1 }),
                new TextRun({ text: `Postcode: ${invoiceData.postalCode}`, break: 1 }),
                new TextRun({ text: `Email: ${invoiceData.user.email}`, break: 1 }),
                new TextRun({ text: `Phone: ${invoiceData.phoneNumber}`, break: 1 }),
              ],
            }),
            new Paragraph({
              text: "Order Details:",
              heading: "Heading1",
            }),
            new Paragraph({
              children: [
               // new TextRun({ text: `Item: ${invoiceData.order.itemName}`, break: 1 }),
               // new TextRun({ text: `Size: ${invoiceData.order.size}`, break: 1 }),
                new TextRun({ text: `Items Subtotal: ${invoiceData.beforeDiscount}`, break: 1 }),
                new TextRun({ text: `Shipping: ${invoiceData.deliveryService}`, break: 1 }),
                new TextRun({ text: `Discount: ${invoiceData.discount}`, break: 1 }),
                new TextRun({ text: `Order Total: ${invoiceData.total_price}`, break: 1 }),
              ],
            }),
          ]
        }
      ]
    }); 
    
    
    Packer.toBlob(doc).then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Invoice_${invoiceData.orderNo}.docx`;
      link.click();
      this._ToastrService.success('The invoice has been downloaded', 'Successfully');

    });
   
    /*
       fetch('../assets/invoice.docx')
    .then((response) => response.arrayBuffer())
    .then((content) => {
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc.setData({
        orderNumber: invoiceData.orderNo,});
        
        try {
          // Render the document with the replaced placeholders
          doc.render();
          const blob = doc.getZip().generate({
            type: 'blob',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });

          // Use saveAs to download the generated file
          saveAs(blob, `Invoice_${invoiceData.orderNo}.docx`);
        } catch (error) {
          console.error('Error generating document', error);
        }
      })
      .catch((error) => {
        console.error('Error loading template', error);
      });
      
    */
  }
}

