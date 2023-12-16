import math
import cv2
import cvzone
from ultralytics import YOLO
import easyocr

# img_path = 'uploads/input.png'
class_ids = ['Ladle', 'Number']


def run_model(imgPath):
    model = YOLO('Models/ladle_model.pt')
    reader = easyocr.Reader(['en'])
    img = cv2.imread(imgPath)
    img_og = cv2.imread(imgPath)
    result = model(img)
    num_detected = []
    for r in result:
        boxes = r.boxes
        print(boxes)

        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            w, h = x2 - x1, y2 - y1
            bbox = (x1, y1, w, h)
            cvzone.cornerRect(img, bbox)

            conf = math.ceil(box.conf[0] * 100) / 100
            cls = int(box.cls[0])
            cvzone.putTextRect(img, f'{conf}, {class_ids[cls]}', (max(0, x1), max(20, y1 - 20)))

            if cls == 1:
                cropped = img_og[y1:y2, x1:x2]
                cv2.imwrite('uploads/cropped.png', cropped)
                num_detected += reader.readtext(cropped, detail=0)

    cv2.imwrite('uploads/output.png', img)
    print(num_detected)
    return num_detected


# run_model(img_path)
