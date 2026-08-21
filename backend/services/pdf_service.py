import os
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

class PDFService:
  @staticmethod
  def generate_rti_pdf(rti_data: dict) -> bytes:
    """
    Generate structured RTI Application PDF using ReportLab
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(
      buffer,
      pagesize=letter,
      rightMargin=54,
      leftMargin=54,
      topMargin=54,
      bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
      'RTITitle',
      parent=styles['Heading1'],
      fontName='Helvetica-Bold',
      fontSize=14,
      leading=18,
      alignment=1, # Center
      textColor=colors.HexColor('#172033')
    )

    subtitle_style = ParagraphStyle(
      'RTISubtitle',
      parent=styles['Normal'],
      fontName='Helvetica-Bold',
      fontSize=10,
      leading=14,
      alignment=1,
      textColor=colors.HexColor('#667085')
    )

    body_style = ParagraphStyle(
      'RTIBody',
      parent=styles['Normal'],
      fontName='Helvetica',
      fontSize=10,
      leading=15,
      textColor=colors.HexColor('#20252D')
    )

    bold_style = ParagraphStyle(
      'RTIBold',
      parent=body_style,
      fontName='Helvetica-Bold'
    )

    story = []

    # Title
    story.append(Paragraph("APPLICATION FOR INFORMATION UNDER THE RIGHT TO INFORMATION ACT, 2005", title_style))
    story.append(Paragraph("(Section 6(1) of RTI Act 2005)", subtitle_style))
    story.append(Spacer(1, 15))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E4E7EC'), spaceAfter=15))

    # Addressed To
    authority_name = rti_data.get('authority', {}).get('name', 'Public Information Officer (PIO)')
    district = rti_data.get('district', 'District Office')
    state = rti_data.get('state', 'State')

    story.append(Paragraph("<b>To,</b>", body_style))
    story.append(Paragraph("The Central / State Public Information Officer (CPIO / SPIO),", body_style))
    story.append(Paragraph(f"{authority_name},", body_style))
    story.append(Paragraph(f"District Collectorate, {district}, {state}", body_style))
    story.append(Spacer(1, 15))

    # Applicant Details
    applicant = rti_data.get('applicantName', 'Citizen Applicant')
    block = rti_data.get('block', '')
    address_str = f"{block + ', ' if block else ''}{district}, {state}"

    story.append(Paragraph(f"<b>1. Name of the Applicant:</b> {applicant}", body_style))
    story.append(Paragraph(f"<b>2. Address / Location:</b> {address_str}", body_style))
    story.append(Spacer(1, 10))

    # Information Points
    story.append(Paragraph("<b>3. Particulars of Information Sought under Section 6(1):</b>", body_style))
    points = rti_data.get('points', [])
    for idx, pt in enumerate(points, 1):
      story.append(Paragraph(f"&nbsp;&nbsp;&nbsp;&nbsp;<b>{idx}.</b> {pt}", body_style))
      story.append(Spacer(1, 4))
    
    story.append(Spacer(1, 10))
    year = rti_data.get('year', 'Recent Period')
    story.append(Paragraph(f"<b>4. Period to which information relates:</b> {year}", body_style))
    story.append(Paragraph("<b>5. Fee Details:</b> Application fee of Rs. 10 attached via IPO / Indian Postal Order / Court Fee Stamp.", body_style))
    story.append(Paragraph("<b>6. Citizenship Declaration:</b> I declare that I am a citizen of India.", body_style))
    
    story.append(Spacer(1, 25))
    story.append(Paragraph(f"<b>Place:</b> {district}", body_style))
    story.append(Paragraph(f"<b>Signature of Applicant:</b> ___________________________", body_style))
    story.append(Paragraph(f"({applicant})", body_style))

    doc.build(story)
    buffer.seek(0)
    return buffer.getvalue()

  @staticmethod
  def generate_form_pdf(form_data: dict) -> bytes:
    """
    Generate structured Intake Form PDF using ReportLab
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=54, leftMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    body_style = ParagraphStyle('FormBody', parent=styles['Normal'], fontSize=10, leading=15)
    title_style = ParagraphStyle('FormTitle', parent=styles['Heading1'], fontSize=14, leading=18, alignment=1)

    story = []
    story.append(Paragraph("OFFICIAL INTAKE APPLICATION FORM", title_style))
    story.append(Spacer(1, 15))

    story.append(Paragraph(f"<b>Applicant Name:</b> {form_data.get('fullName', '')}", body_style))
    story.append(Paragraph(f"<b>Mobile:</b> {form_data.get('mobile', '')}", body_style))
    story.append(Paragraph(f"<b>Address:</b> {form_data.get('address', '')}", body_style))
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>Form Specific Details:</b>", body_style))
    for k, v in form_data.get('specifics', {}).items():
      story.append(Paragraph(f"<b>{k.replace('_', ' ').title()}:</b> {v}", body_style))
      story.append(Spacer(1, 4))

    doc.build(story)
    buffer.seek(0)
    return buffer.getvalue()

pdf_service = PDFService()
