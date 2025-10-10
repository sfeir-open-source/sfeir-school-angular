function withTypeShow(slide, typeShow) {
  if (typeof slide === 'string') {
    return { path: slide, typeShow };
  } else {
    return { ...slide, typeShow: `${slide.typeShow},${typeShow}` };
  }
}

export function showOnModern2days(slide) {
  return withTypeShow(slide, 'modern-2days');
}

export function showByDefault(slide) {
  return withTypeShow(slide, 'on-stage');
}
