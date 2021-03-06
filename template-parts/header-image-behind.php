<?php
/*
 *   Template part for when the Header Image is set to "Behind"
 */
?>
<?php
  if ( get_header_image() ) {
    $bkgrdstyle = 'style="background-image: url(' . get_header_image() . ')"';
  } else {
    $bkgrdstyle = 'style="background: black;"';
  }
?>

<div class="site-header-main" <?php echo $bkgrdstyle; ?>>
  <?php
  $showsiteicon = get_theme_mod('show_site_icon');
  if (has_site_icon() && $showsiteicon == 1) {
    $hasicon = 'hasicon';
    ?>
  <img src="<?php site_icon_url(); ?>" class="site-icon">
  <?php } else { $hasicon = ''; } ?>
  <div class="site-branding <?php echo $hasicon; ?>">
    <?php if ( is_front_page() && is_home() ) { ?>
      <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
    <?php } else { ?>
      <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
    <?php }

    $description = get_bloginfo( 'description', 'display' );
    if ( $description || is_customize_preview() ) : ?>
      <p class="site-description"><?php echo $description; ?></p>
    <?php endif; ?>
  </div><!-- .site-branding -->

  <?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) ) : ?>
    <button id="menu-toggle" class="menu-toggle"><?php _e( 'Menu', 'twentysixteen' ); ?></button>

    <div id="site-header-menu" class="site-header-menu">
      <?php if ( has_nav_menu( 'primary' ) ) : ?>
        <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php _e( 'Primary Menu', 'twentysixteen' ); ?>">
          <?php
            wp_nav_menu( array(
              'theme_location' => 'primary',
              'menu_class'     => 'primary-menu',
             ) );
          ?>
        </nav><!-- .main-navigation -->
      <?php endif; ?>

      <?php if ( has_nav_menu( 'social' ) ) : ?>
        <nav id="social-navigation" class="social-navigation" role="navigation" aria-label="<?php _e( 'Social Links Menu', 'twentysixteen' ); ?>">
          <?php
            wp_nav_menu( array(
              'theme_location' => 'social',
              'menu_class'     => 'social-links-menu',
              'depth'          => 1,
              'link_before'    => '<span class="screen-reader-text">',
              'link_after'     => '</span>',
            ) );
          ?>
        </nav><!-- .social-navigation -->
      <?php endif; ?>
    </div><!-- .site-header-menu -->
  <?php endif; ?>
</div><!-- .site-header-main -->
