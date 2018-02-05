        <div class="footer-push"></div>
      </div><!-- .footer-push-wrapper -->
    </div><!-- .container -->
    <div class="container-fluid">
      <footer class="footer">
        <div class="footer__content">
          <div>
            &copy;
            <?php echo date( 'Y' ); ?>
            <?php bloginfo( 'name' ); ?>
          </div>
          <div class="footer__social">
            <a href="https://twitter.com/midcomm" class="footer__social__item blank-link-hover" target="_blank">Twitter</a>
            <a href="https://www.instagram.com/midnightcommercial/" class="footer__social__item blank-link-hover" target="_blank">Instagram</a>
            <a href="https://www.linkedin.com/company/midnight-commercial/" class="footer__social__item blank-link-hover" target="_blank">LinkedIn</a>
            <a href="https://www.facebook.com/midnightcommercial/" class="footer__social__item blank-link-hover" target="_blank">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
    <?php if ( false ): ?>
      <script>
        window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
        ga('create','UA-42192717-1','auto');ga('send','pageview');
      </script>
      <script src="https://www.google-analytics.com/analytics.js" async defer></script>
    <?php endif; ?>
    <?php wp_footer(); ?>
  </body>
</html>
