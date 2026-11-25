"""Populate explicit width and height attributes on local <img> tags."""

import glob
import pathlib
import re
import urllib.parse
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent


def get_image_dimensions(src: str) -> tuple[int, int] | None:
    if src.startswith(("http://", "https://", "data:")):
        return None
    clean_src = urllib.parse.unquote(src.split("?")[0].split("#")[0]).lstrip("/")
    img_path = ROOT / clean_src
    if not img_path.is_file():
        raise FileNotFoundError(f"Missing image asset: {clean_src}")
    with Image.open(img_path) as im:
        return im.size


def update_img_tag(match: re.Match) -> str:
    tag = match.group(0)
    src_match = re.search(r'\bsrc=["\']([^"\']+)["\']', tag, flags=re.I)
    if not src_match:
        return tag
    dims = get_image_dimensions(src_match.group(1))
    if not dims:
        return tag
    w, h = dims

    has_width = re.search(r'\bwidth=["\'][^"\']*["\']', tag, flags=re.I) is not None
    has_height = re.search(r'\bheight=["\'][^"\']*["\']', tag, flags=re.I) is not None
    if has_width and has_height:
        return tag

    insert_attrs = ""
    if not has_width:
        insert_attrs += f' width="{w}"'
    if not has_height:
        insert_attrs += f' height="{h}"'

    if tag.endswith("/>"):
        return tag[:-2].rstrip() + insert_attrs + " />"
    return tag[:-1] + insert_attrs + ">"


def main() -> None:
    html_files = sorted(glob.glob(str(ROOT / "*.html")))
    updated_files = 0
    updated_tags = 0

    for fpath_str in html_files:
        fpath = pathlib.Path(fpath_str)
        if fpath.name == "google11184c9eb7e0c0f7.html":
            continue
        original = fpath.read_text(encoding="utf-8")
        count_for_file = 0

        def repl(m: re.Match) -> str:
            nonlocal count_for_file
            res = update_img_tag(m)
            if res != m.group(0):
                count_for_file += 1
            return res

        updated = re.sub(r"<img\b[^>]*>", repl, original, flags=re.I)
        if updated != original:
            fpath.write_text(updated, encoding="utf-8")
            updated_files += 1
            updated_tags += count_for_file
            print(f"{fpath.name}: updated {count_for_file} <img> tag(s)")

    print(f"Done. Updated {updated_tags} <img> tag(s) across {updated_files} file(s).")


if __name__ == "__main__":
    main()
